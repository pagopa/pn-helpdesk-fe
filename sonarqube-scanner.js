const scanner = require('sonarqube-scanner');

const options = {
  'sonar.organization': 'pagopa',
  'sonar.projectKey': 'pagopa_pn-logextractor-fe',
};

if (typeof import.meta.env.PR_NUM !== 'undefined') {
  options['sonar.pullrequest.base'] = import.meta.env.BRANCH_TARGET;
  options['sonar.pullrequest.branch'] = import.meta.env.BRANCH_NAME;
  options['sonar.pullrequest.key'] = import.meta.env.PR_NUM;
} else {
  options['sonar.branch.name'] = import.meta.env.BRANCH_NAME;
  options['sonar.branch.target'] = import.meta.env.BRANCH_TARGET;
}

scanner(
  {
    serverUrl: 'https://sonarcloud.io',
    token: import.meta.env.SONAR_TOKEN,
    options,
  },
  () => process.exit()
);
