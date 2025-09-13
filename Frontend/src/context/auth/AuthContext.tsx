import { createContext, useContext } from "react"

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  address: string;
  orderItems: OrderItem[];
  total: number;
}

interface AuthContextType{
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    isAuthenticated: boolean;
    logout: () => void;
    getMyOrders: () => void;
     myOrders: Order[];
    
}
export const AuthContext = createContext<AuthContextType>({
    username: null,
    token: null,
    login: () => {},
    isAuthenticated: false,
    logout: () => {},
    getMyOrders: () => {},
    myOrders: []
 })

export const useAuth = () => useContext(AuthContext);