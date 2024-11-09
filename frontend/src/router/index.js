import { createRouter, createWebHistory } from 'vue-router';
// import UserDashboard from '../unusedtemplates/UserDashboard.vue';
// import MakeReport from '../unusedtemplates/makeReport.vue'; // Import makeReport.vue
// import UserReportHistory from '../unusedtemplates/UserReportHistory.vue';
// import UserLogIn from '../unusedtemplates/UserLogIn.vue';
import UserProfile from '../components/UserProfile.vue';
import IncidentStatistic from '../components/IncidentStatistic.vue';
// import ReportIncident from '../unusedtemplates/IncidentReport.vue';
import UserMessage from '../components/UserMessage.vue';
import IncidentMapping from '../components/IncidentMapping.vue';
import UserHome from '../components/UserHome.vue';
import UserReports from '../components/UserReports.vue';
// import UserChangePassword from '../components/UserChangePassword.vue';
// import UserConfirmPassword from '../unusedtemplates/UserConfirmPassword.vue';
// import AdminMessaging from '../unusedtemplates/AdminMessaging.vue';
// import UserMessaging from '../unusedtemplates/UserMessaging.vue';
// import ResponderNotification from '../unusedtemplates/ResponderNotification.vue';
// import CustomReport from '../unusedtemplates/CustomReport.vue';
// import TrendAnalysis from '../unusedtemplates/TrendAnalysis.vue';
// import CrimeAnalyticsDashboard from '../unusedtemplates/CrimeAnalyticsDashboard.vue';
// import IncidentMetrics from '../unusedtemplates/IncidentMetrics.vue';


import UserCrimeReport from '../components/users/UserCrimeReport.vue';
import userSignup from '../components/users/userSignup.vue';
import LoginUser from '../components/users/LoginUser.vue';
import NpsAdminLogin from '../../unusedtemplates/NpsAdminLogin.vue';
import BfpAdminLogin from '../views/AdminLogin.vue';
import AdminSignUp from '../views/AdminSignUp.vue';
import UserList from '../views/UserList.vue';
import AdminRoleSelector from '../views/AdminRoleSelector.vue';
import UserFireReport from '../components/users/UserFireReport.vue';
import AdFireReport from '../components/bfp/AdFireReport.vue';
import AdCrimeReport from '../components/nps/AdCrimeReport.vue';
import AdminIncidentReports from '../views/AdminIncidentReports.vue';
import AdminDashboard from '../views/NPSAdminDashboard.vue';
import AdminProfilePanel from '../views/AdminProfilePanel.vue';
const routes = [
  // { path: '/dashboard', name: 'UserDashboard', component: UserDashboard },
  // { path: '/report', name: 'MakeReport', component: MakeReport },
  // { path: '/history', name: 'UserReportHistory', component: UserReportHistory },
  // { path: '/users', name: 'UserLogin', component: UserLogIn },
  { path: '/profile', name: 'UserProfile', component: UserProfile }, 
  { path: '/statistic', name: 'IncidentStatistic', component: IncidentStatistic },
  // { path: '/incident', name: 'ReportIncident', component: ReportIncident },
  { path: '/message', name: 'UserMessage', component: UserMessage },
  { path: '/maps', name: 'IncidentMapping', component: IncidentMapping },
  { path: '/home', name: 'UserHome', component: UserHome },
  { path: '/cases', name: 'UserReports', component: UserReports },
  // { path: '/change', name: 'UserChangePassword', component: UserChangePassword },
  // { path: '/confirm', name: 'UserConfirmPassword', component: UserConfirmPassword },
  // {path: '/responder_not', name: 'ResponderNotification', component: ResponderNotification },
  // {path: '/admin_mes', name: 'AdminMessaging', component: AdminMessaging },
  // {path: '/user_mes', name: 'UserMessaging', component: UserMessaging },
  // {path: '/analytics', name: 'CrimeAnalyticsDashboard', component: CrimeAnalyticsDashboard },
  // {path: '/custom', name: 'CustomReport', component: CustomReport },
  // {path: '/metric', name: 'IncidentMetrics', component: IncidentMetrics },
  // {path: '/analysis', name: 'TrendAnalysis', component: TrendAnalysis },


  { path: '/signup', name: 'userSignup', component: userSignup },
  { path: '/login', name: 'LoginUser', component: LoginUser },
  { path: '/report_crime', name: 'UserCrimeReport', component: UserCrimeReport }, 
  { path: '/admin1', name: 'NpsAdminLogin', component: NpsAdminLogin },
  { path: '/admin2', name: 'BfpAdminLogin', component: BfpAdminLogin },
  { path: '/role', name: 'AdminRoleSelector', component: AdminRoleSelector },
  { path: '/admin_signup', name: 'AdminSignUp', component: AdminSignUp },
  { path: '/user_list', name: 'UserList', component: UserList },
  { path: '/fire_report', name: 'UserFireReport', component: UserFireReport },
  { path: '/admin_fire_report', name: 'AdFireReport', component: AdFireReport },
  { path: '/admin_crime_report', name: 'AdCrimeReport', component: AdCrimeReport },
  {path: '/admin_analytics', name: 'AdminIncidentReports', component: AdminIncidentReports },
  {path: '/admin_dashboard', name: 'AdminDashboard', component: AdminDashboard },
  {path: '/admin_profile', name: 'AdminProfilePanel', component: AdminProfilePanel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
