/*global opaTest *///declare unusual global vars for JSLint/SAPUI5 validation

sap.ui.require(
[
	'sap/ui/test/Opa5',
	'sap/ui/demo/mdtemplate/test/integration/action/NavigationAction',
	'sap/ui/demo/mdtemplate/test/integration/arrangement/StartAppArrangement',
	'sap/ui/demo/mdtemplate/test/integration/assertion/NavigationAssertion'
],
function (Opa5, NavigationAction, StartAppArrangement, NavigationAssertion) {

	module("Desktop navigation", { setup : function () {
		Opa5.extendConfig({
			actions : new NavigationAction(),
			arrangements : new StartAppArrangement(),
			assertions : new NavigationAssertion(),
			viewNamespace : "sap.ui.demo.mdtemplate.view."
		});
	}});

	opaTest("Should see a busy indication while loading the metadata", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheAppOnADesktopDeviceWithDelay("", 10000);

		//Actions
		When.iLookAtTheScreen();

		// Assertions
		Then.iShouldSeeTheBusyIndicator().
			and.iTeardownMyAppFrame();
	});

	opaTest("Should see the objects list", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheAppOnADesktopDevice();

		//Actions
		When.iLookAtTheScreen();

		// Assertions
		Then.iShouldSeeTheObjectList().
			and.theObjectListShouldHave9Entries().
			and.theObjectPageShowsTheFirstObject();
	});

	opaTest("Should react on hashchange", function (Given, When, Then) {
		// Actions
		When.iChangeTheHashToObject3();

		// Assertions
		Then.iShouldBeOnTheObject3Page().
			and.theObject3ShouldBeSelectedInTheMasterList();
	});


	opaTest("Should navigate on press", function (Given, When, Then) {
		// Actions
		When.iPressOnTheObject1InMasterList();

		// Assertions
		Then.iShouldBeOnTheObject1Page();
	});

	opaTest("Detail Page Shows Object Details", function (Given, When, Then) {
		// Actions
		When.iPressOnTheObject1InMasterList();

		// Assertions
		Then.iShouldBeOnTheObject1Page().
			and.iShouldSeeTheObjectLineItemsList().
			and.theLineItemsListShouldHave4Entries().
			and.theFirstLineItemHasIDLineItemID_1();

	});

	opaTest("Line Item Page shows Line Item and Navigation Buttons have correct state", function (Given, When, Then) {

		// Actions
		When.iPressOnTheObject1InMasterList().
			and.iPressOnTheItem1InLineItemList();

		// Assertions
		Then.iShouldBeOnTheLineItem1Page().
			and.thePreviousButtonIsDisabled().
			and.theNextButtonIsEnabled();

	});

	opaTest("Line Item Page: pressing 'Next' Button on Line Item 1 page navigates to Line Item 2 and updates the Navigation Buttons", function (Given, When, Then) {

		// Actions
		When.iPressTheNextButton();

		// Assertions
		Then.iShouldBeOnTheLineItem2Page().
			and.thePreviousButtonIsEnabled().
			and.theNextButtonIsEnabled();

	});

	opaTest("Line Item Page: pressing 'Previous' Button on Line Item 2 page navigates to Line Item 1 and updates the Navigation Buttons", function (Given, When, Then) {

		// Actions
		When.iPressThePreviousButton();

		// Assertions
		Then.iShouldBeOnTheLineItem1Page().
			and.thePreviousButtonIsDisabled().
			and.theNextButtonIsEnabled();

	});

	opaTest("Line Item Page: after several 'Next' and 'Previous' navigation, going back in browser history should take us back to Detail Page for Object 1", function (Given, When, Then) {

		// Actions
		When.iGoBackInBrowserHistory();

		// Assertions
		Then.iShouldBeOnTheObject1Page();
	});

	opaTest("Line Item Page: going forward in browser history should take us back to Line Item 1 a", function (Given, When, Then) {

		// Actions
		When.iGoForwardInBrowserHistory();

		// Assertions
		Then.iShouldBeOnTheLineItem1Page();
	});

	
	opaTest("Line Item Page: pressing 'Back' Button on Line Item 1 page navigates back to Detail Page for Object 1", function (Given, When, Then) {

		// Actions
		When.iPressTheBackButtonOnLineItemPage();

		// Assertions
		Then.iShouldBeOnTheObject1Page().
			and.iTeardownMyAppFrame();

	});
	
	
});
