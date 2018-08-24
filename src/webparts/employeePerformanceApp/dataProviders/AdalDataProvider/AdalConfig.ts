const adalConfig: adal.Config = {
  clientId: '1625d5c3-d455-4529-aab6-de3add659ee9',
  tenant: 'agzertuche.onmicrosoft.com',
  extraQueryParameter: 'nux=1',
  // endpoints: {
  //   'https://graph.microsoft.com': 'https://graph.microsoft.com'
  // },
  redirectUri:
    'https://agzertuche.sharepoint.com/teams/NewTeamSite/_layouts/15/workbench.aspx',
  // redirectUri: window.location.origin + '/',//'https://localhost/',
  cacheLocation: 'localStorage', // sessionStorage',
};

export default adalConfig;
