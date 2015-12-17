/**
 * Created by ddelaney on 12/3/2015.
 */
app.factory('expenseReportFactory', ['$http',
    function($http) {
        var id;
        function getId() {
            return id;
        }
        function setId(id) {
            this.id = id;
        }
        return {
            createExpenseReport: function(data){
                console.log(data);
                return $http.post('/expense-report', data);
            },
            getDatExpenseReport: function(id){
                return $http.get('/expense-report/' + id);
            },
            getAllListItems: function(){
                return $http.get('/line-item-types');
            },
            getAllExpenseReports: function(id) {
                return $http.get("/expense-report");
            }
        };
    }
]);
