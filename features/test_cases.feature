Feature: Access Test Cases page

  Scenario: Verify Test Cases page is accessible
    Given I open the browser and go to 'http://automationexercise.com'
    Then I should see 'Home'
    When I click on 'Test Cases'
    Then I should see 'Test Cases'