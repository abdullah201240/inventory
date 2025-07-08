from django.urls import path
from .views import UserRegistrationView, UserListView, UserLoginView, UserProfileView, UserProfileUpdateView, UserDeleteView

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='user-register'),
    path('', UserListView.as_view(), name='user-list'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path('profile', UserProfileView.as_view(), name='user-profile'),
    path('profile/update', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('profile/delete', UserDeleteView.as_view(), name='user-delete'),
] 