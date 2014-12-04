// Set up element queries (BoomQuery - https://github.com/BoomTownROI/boomqueries)

boomQueries.add(".texting", [[610, "texting--md"]]);
boomQueries.add(".log-call", [[420, "log-call--sm"]]);
boomQueries.add(".set-to-do", [[420, "set-to-do--sm"]]);

$(document).ready(function() {
  boomQueries.refresh();
});


/*boomQueries.add(".texting", [[610, "texting--md"]]);
boomQueries.add(".log-call", [[420, "log-call--sm"]]);
boomQueries.add(".set-to-do", [[420, "set-to-do--sm"]]);

document.addEventListener('DOMContentLoaded', boomQueries.refresh, false);*/

