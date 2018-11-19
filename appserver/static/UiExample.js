 require([
        'underscore',
        'jquery',
        'splunkjs/mvc',
        "splunkjs/mvc/searchmanager",
        "splunkjs/mvc/tableview",
        "splunkjs/mvc/dropdownview",
        "splunkjs/mvc/simplexml/ready!"
    ], function(_, $, mvc,SearchManager, TableView, DropdownView) {

   
    var tokens = mvc.Components.get("default");
    var tknSourceType = tokens.get("tknsourcetype");

    debugger;
   
    var mySearchDropdown = new SearchManager({
        id: "searchDropDown",
        earliest_time: "",
        latest_time: "0",
        search: "index=\"_internal\" | dedup sourcetype | table sourcetype"
    });
   
    var mydropdown =  new DropdownView({
        id: "example-dropdown",
        managerid: "searchDropDown",
        default: "main",
        labelField: "sourcetype",
        valueField: "sourcetype",
        el: $("#mydropdownview")
    }).render();


    /*********************TALE VIEW********************************** */
   
    var mySearchTableView = new SearchManager({
        id: "searchTable",
        earliest_time: "",
        latest_time: "0",
        search: "*"
    });

    // Update the search's time range
    mySearchTableView.settings.set("earliest_time", );
    mySearchTableView.settings.set("latest_time", "0");
    // Update the search query
    mySearchTableView.settings.set("search", "index=\"_internal\" sourcetype=\""+ tknSourceType +"\" | stats count by source");

 

    var mytable = new TableView({
        id: "tableDetailData",
        managerid: "searchTable",
        pageSize: "10",
        wrap: true,
        drilldown: "cell",
        el: $("#dvTableView")
    });

    mytable.render();

    mydropdown.on("change", function(e) {
        //alert("changed" + e);
        mySearchTableView.settings.set("search", "index=\"_internal\" sourcetype=\""+ e +"\" | stats count by source");
    });


    /********************Static Dropdown************************************** */
    // var choices = [
    //     {label: "events",  value: "events" },
    //     {label: "preview", value: "preview"},
    //     {label: "results", value: "results"},
    //     {label: "summary", value: "summary"}
    // ];
    // mydropdown.settings.set("choices", choices);


    //   /****************EVENTS********************************************************************** */
    //   mySearchTableView.on('search:failed', function(properties) {
    //     // Print the entire properties object
    //     console.log("FAILED:", properties);
    // });

    // mySearchTableView.on('search:progress', function(properties) {
    //     // Print just the event count from the search job
    //     console.log("IN PROGRESS.\nEvents so far:", properties.content.eventCount);
    // });

    // mySearchTableView.on('search:done', function(properties) {
    //     // Print the search job properties
    //     console.log("DONE!\nSearch job properties:", properties.content);
    // });


    // //var mainSearch = splunkjs.mvc.Components.get("mySearchTableView");
    // var myResults = mySearchTableView.data("preview", { count: 25, offset: 10 });

    // myResults.on("data", function() {
    //     // The full data object
    //     console.log(myResults.data());
    
    //     // Indicates whether the results model has data
    //     console.log("Has data? ", myResults.hasData());
    
    //     // The results rows
    //     console.log("Data (rows): ", myResults.data().rows);
    
    //     // The Backbone collection
    //     console.log("Backbone collection: ", myResults.collection());
    // });

    // var chartclick = splunkjs.mvc.Components.get("mychart");
   

});


//Ref Link
//http://dev.splunk.com/view/SP-CAAAEU3
//http://dev.splunk.com/view/SP-CAAAEU5
//http://dev.splunk.com/view/SP-CAAAEU6
