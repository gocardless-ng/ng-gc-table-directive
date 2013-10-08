/**
 * @license ng-gc-table-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-table-directive.git
 * License: MIT
 */
(function(){
'use strict';

angular.module('gc-table-template.html', []).run(function($templateCache) {
  $templateCache.put('gc-table-template.html',
    '<table class="table-list" ng-show="tableData.length"><thead><tr><th class="table-list__header u-text-truncate" ng-class="\'table-list__header--{{ column.className || column.field }}\'" th-sortable="{\n' +
    '          name: options.name,\n' +
    '          field: column.sortField\n' +
    '        }" ng-repeat="column in columns" ng-hide="column.isHidden"><span gc-get-fragment="{{ options.fragmentPrefix }}tableHeader:{{ column.field }}">{{ column.displayAs }} </span></th></tr></thead><tbody><tr ng-repeat="row in tableData" gc-click-when="{{ options.rowUrl }}" gc-click-when-scope="{ $row: row }" class="table-list__row"><td class="table-list__cell" ng-class="\'table-list__cell--{{ column.className || column.field }}\'" ng-repeat="column in columns" ng-hide="column.isHidden"><span gc-get-fragment="{{ options.fragmentPrefix }}tableBody:{{ column.field }}" class="u-text-truncate u-block" fragment-data="{ $row: row }">{{ row[column.field] }} </span></td></tr></tbody></table>');
});

'use strict';

angular.module('gc.tableController', [
])
.controller('GCTableController', [
  '$scope',
  function GCTableController($scope) {

    $scope.options = $scope.getTableOptions();

    $scope.columns = $scope.getTableColumns();
    if (!$scope.columns) {
      throw new Error('Provide the table columns');
    }

  }
]);

'use strict';

angular.module('gc.table', [
  'gc.tableController',
  'gc.clickWhen',
  'gc.thSortable',
  'gc.getFragment',
  'gc.setFragment',
  'gc-table-template.html'
]).directive('gcTable', [
  function gcTableDirective() {

    return {
      restrict: 'E',
      replace: true,
      controller: 'GCTableController',
      templateUrl: 'gc-table-template.html',
      scope: {
        tableData: '=',
        getTableColumns: '&tableColumns',
        getTableOptions: '&tableOptions'
      }
    };

  }

]);
})();