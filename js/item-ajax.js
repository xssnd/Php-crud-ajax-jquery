$(document).ready(function () {
  var page = 1;
  var current_page = 1;
  var total_page = 0;
  var is_ajax_fire = 0;

  manageData();

  /* manage data list */
  function manageData() {
    $.ajax({
      dataType: "json",
      url: url + "api/getData.php",
      data: { page: page },
    }).done(function (data) {
      total_page = Math.ceil(data.total / 10);
      current_page = page;

      $("#pagination").twbsPagination({
        totalPages: total_page,
        visiblePages: current_page,
        onPageClick: function (event, pageL) {
          page = pageL;
          if (is_ajax_fire != 0) {
            getPageData();
          }
        },
      });

      manageRow(data.data);
      is_ajax_fire = 1;
    });
  }

  /* Get Page Data */
  function getPageData() {
    $.ajax({
      dataType: "json",
      url: url + "api/getData.php",
      data: { page: page },
    }).done(function (data) {
      manageRow(data.data);
    });
  }

  /* Add new Item Table row */
  function manageRow(data) {
    var rows = "";
    $.each(data, function (key, value) {
      rows = rows + "<tr>";
      rows = rows + "<td>" + value.title + "</td>";
    });
  }
});
