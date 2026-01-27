export interface User {
    id: string;
    email: string;
    username: string;
    full_name?: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export interface AuthLayoutProps {
    children: React.ReactNode;
    leftContent: React.ReactNode;
}