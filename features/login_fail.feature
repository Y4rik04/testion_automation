Feature: Login with incorrect credentials

  Scenario: Login user with incorrect email and password
    Given I open the browser and go to 'http://automationexercise.com'
    When I click on 'Signup / Login'
    Then I should see 'Login to your account'
    When I enter invalid email and password
    And I click on 'Login' button
    Then I should see 'Your email or password is incorrect!'