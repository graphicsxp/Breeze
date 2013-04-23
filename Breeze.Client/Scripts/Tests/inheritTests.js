require.config({ baseUrl: "Scripts/IBlade" });

define(["testFns"], function (testFns) {
    var breeze = testFns.breeze;
    var core = breeze.core;
    var Event = core.Event;
    
    
    var EntityQuery = breeze.EntityQuery;
    var DataService = breeze.DataService;
    var MetadataStore = breeze.MetadataStore;
    var NamingConvention = breeze.NamingConvention;
    var EntityManager = breeze.EntityManager;
    var EntityKey = breeze.EntityKey;
    var FilterQueryOp = breeze.FilterQueryOp;
    var Predicate = breeze.Predicate;
    var QueryOptions = breeze.QueryOptions;
    var FetchStrategy = breeze.FetchStrategy;
    var MergeStrategy = breeze.MergeStrategy;

    var altServiceName = "breeze/ProduceTPH";

    var newEm = testFns.newEm;
    //function newEm() {

    //    var dataService = new DataService({
    //        serviceName: altServiceName,
    //    });
    //    var altMs = new MetadataStore({
    //        namingConvention: NamingConvention.camelCase
    //    });

    //    return new EntityManager({
    //        dataService: dataService,
    //        metadataStore: altMs
    //    });
    //}
    
    module("inherit", {
        setup: function () {
            testFns.setup({ serviceName: altServiceName } );
        },
        teardown: function () {
        }
    });
    
    test("query ItemsOfProduce", function () {
        var em = newEm();

        var q = EntityQuery.from("ItemsOfProduce")
            .using(em);
        stop();
        var iopType = em.metadataStore.getEntityType("ItemOfProduce");
        q.execute().then(function (data) {
            var r = data.results;
            ok(r.length > 0, "should have found some 'ItemsOfProduce'");
            ok(r.every(function (f) {
                return f.entityType.isSubtypeOf(iopType);
            }));

        }).fail(testFns.handleFail).fin(start);

    });

    test("query Fruits w/server ofType", function () {
        var em = newEm();

        var q = EntityQuery.from("Fruits")
            .using(em);
        stop();
        var fruitType = em.metadataStore.getEntityType("Fruit");
        q.execute().then(function (data) {
            var r = data.results;
            ok(r.length > 0, "should have found some 'Fruits'");
            ok(r.every(function(f) {
                return f.entityType.isSubtypeOf(fruitType);
            }));
            
        }).fail(testFns.handleFail).fin(start);
            
    });
    
    test("query Fruits w/client ofType", function () {
        var em = newEm();

        var q = EntityQuery.from("ItemsOfProduce")
            .where(null, FilterQueryOp.IsTypeOf, "Fruit")
            .using(em);
        stop();
        var fruitType = em.metadataStore.getEntityType("Fruit");
        q.execute().then(function (data) {
            var r = data.results;
            ok(r.length > 0, "should have found some 'Fruits'");
            ok(r.every(function (f) {
                return f.entityType.isSubtypeOf(fruitType);
            }));

        }).fail(testFns.handleFail).fin(start);

    });

    

    return testFns;

});

