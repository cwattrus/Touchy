Accounts.config({ restrictCreationByEmailDomain: 'yoco.co.za' });
Accounts.sendVerificationEmail = true;

ServiceConfiguration.configurations.update(
  {service: 'google'},
  {$set: {loginStyle: 'redirect'}}
)
