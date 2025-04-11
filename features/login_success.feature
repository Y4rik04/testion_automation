Feature: Login with correct credentials

  Scenario: Login user with correct email and password
    Given I open the browser and go to 'http://automationexercise.com'
    When I click on 'Signup / Login'
    Then I should see 'Login to your account'
    When I enter valid email and password
    And I click on 'Login' button
   Then I should see partial text 'Logged in as'
    When I click on 'Delete Account'
    Then I should see 'ACCOUNT DELETED!'