Feature: Logout after login

  Scenario: Logout a logged-in user
    Given I open the browser and go to 'http://automationexercise.com'
    When I click on 'Signup / Login'
    Then I should see 'Login to your account'
    When I enter valid email and password
    And I click on 'Login' button
    Then I should see partial text 'Logged in as'
    When I click on 'Logout'
    Then I should see 'Login to your account'