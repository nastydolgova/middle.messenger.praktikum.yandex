import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import ErrorPage404 from 'pages/error-page-404';
import RegPage from 'pages/registration';
import ChatPage from 'pages/chat';
import EditPage from 'pages/edit';
import { BlockClass } from 'core';

export enum Screens {
  Login = 'login',
  Profile = 'profile',
  Chat = 'chat',
  Edit = 'edit',
  Registration = 'registration',
  ErrorPage404 = '404'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: LoginPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Chat]: ChatPage,
  [Screens.Edit]: EditPage,
  [Screens.Registration]: RegPage,
  [Screens.ErrorPage404]: ErrorPage404
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
