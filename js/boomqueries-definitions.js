// BoomQuery Definitions (BoomQueries - https://github.com/BoomTownROI/boomqueries)

// Define element queries
// -------------------------

boomQueries.add(".texting", [[610, "texting--md"]]);
boomQueries.add(".log-call", [[420, "log-call--sm"]]);
boomQueries.add(".set-to-do", [[420, "set-to-do--sm"]]);

// document.addEventListener('DOMContentLoaded', boomQueries.refresh, false);

$(document).ready(function() {
  boomQueries.refresh();
});

// Modal element queries refresh
// -------------------------

$( document ).ready(function() {

/*	$('.modal').on('show.bs.modal', function (e) {
		setTimeout(function(){
			boomQueries.refresh();
		}, 200);
	});*/

	$('.modal').on('shown.bs.modal', function (e) {
		boomQueries.refresh();
	});

});

