import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
    getUsers: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/auth/check', { withCredentials: true});
                if (response.status === 200) {
                    setIsAuthenticated(true);

                    const userResponse = await axios.get('/auth/user', { withCredentials: true });
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
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            if (response.ok) {
                const loggedInUsername = await response.text();
                setUser({ username: loggedInUsername });
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
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            if (response.ok) {
                const registeredUsername = await response.text();
                setUser({ username: registeredUsername });
                setIsAuthenticated(true);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            throw new Error('Registration failed');
        }
    };

    const logout = async () => {
        await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        setIsAuthenticated(false);
        setUser(null);
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
                return await response.json();
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, getUsers }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
