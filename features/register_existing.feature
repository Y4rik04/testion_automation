Feature: Register user with existing email

  Scenario: Attempt to register with already registered email
    Given I open the browser and go to 'http://automationexercise.com'
    When I click on 'Signup / Login'
    Then I should see 'New User Signup!'
    When I enter name and already registered email
    And I click on 'Signup' button
    Then I should see 'Email Address already exist!'