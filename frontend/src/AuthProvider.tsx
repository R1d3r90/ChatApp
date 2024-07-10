import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';

interface User {
    id: string;
    username: string;
    userIcon: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    getUsers: () => Promise<User[]>;
    deleteUser: (userId: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/auth/check', {withCredentials: true});
                if (response.status === 200) {
                    setIsAuthenticated(true);

                    const userResponse = await axios.get<User>('/auth/user', {withCredentials: true});
                    if (userResponse.status === 200) {
                        setUser(userResponse.data);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });
            if (response.ok) {
                const loggedInUser = await response.json();
                setUser({id: loggedInUser.id, username: loggedInUser.username, userIcon: loggedInUser.userIcon});
                setIsAuthenticated(true);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (username: string, password: string) => {
        try {
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                throw new Error('Username already exists');
            }
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });
            if (response.ok) {
                const registeredUser = await response.json();
                setUser({id: registeredUser.id, username: registeredUser.username, userIcon: registeredUser.userIcon});
                setIsAuthenticated(true);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            throw new Error('Registration failed');
        }
    };

    const checkUsernameExists = async (username: string) => {
        try {
            const response = await axios.post('/auth/check-username', { username });
            return response.data;
        } catch (error) {
            console.error('Error checking username:', error);
            throw new Error('Username check failed');
        }
    };

    const logout = async () => {
        try {
            await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
            throw new Error('Logout failed');
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch('/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                return await response.json() as User[];
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await axios.delete(`/auth/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    };

    const authContextValue: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        register,
        getUsers,
        deleteUser,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};