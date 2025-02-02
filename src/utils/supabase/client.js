import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import { supabasekey, supabaseUrl } from '../../env'; // Importing Supabase credentials
import AsyncStorage from "@react-native-async-storage/async-storage";

// Creating a Supabase client instance
export const supabase = createClient(supabaseUrl, supabasekey, {
    auth: {
        storage: AsyncStorage, // Persist session in AsyncStorage
        autoRefreshToken: true, // Automatically refresh authentication token
        persistSession: true, // Keep user session active
        detectSessionInUrl: false, // Not needed for React Native
    },
});
