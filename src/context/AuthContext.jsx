import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client"; // Import Supabase client

// Creating authentication context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    // Fetches the current user session from Supabase
    useEffect(() => {
        const fetchSessionAndUser = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.auth.getSession();
                
                if (error) throw error;
                
                setSession(data.session);

                // If a session exists, fetch user data
                if (data.session?.user) {
                    await fetchUser(data.session.user.id);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch user details from the database
        const fetchUser = async (userId) => {
            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("userid", userId)
                    .single();

                if (error) throw error;

                setUser(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSessionAndUser();

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (session?.user) {
                fetchUser(session.user.id);
            } else {
                setUser(null);
            }
        });

        return () => {
            authListener.subscription?.unsubscribe(); // Cleanup listener on unmount
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, session, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
