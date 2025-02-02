# Supabase Auth Context Provider for React Native  

This repository provides an authentication context using Supabase in a React Native application. It includes user session management, automatic authentication state handling, and user data fetching from Supabase.  

## Features  

- **User Authentication**: Uses Supabase's auth system for email-based authentication.  
- **Session Management**: Automatically persists user sessions using `AsyncStorage`.  
- **User Data Fetching**: Retrieves user details from the `users` table in Supabase.  
- **Auth State Listener**: Updates authentication state in real-time.  

## Setup  

### Prerequisites  

Before running this project, ensure you have:  

- A **Supabase project** set up.  
- A **React Native environment** configured.  
- The required dependencies installed.  

### Installation  

1. **Clone the Repository**  

   ```sh
   git clone https://github.com/sarvadandge29/contextProvider.git
   cd supabase-auth-context
