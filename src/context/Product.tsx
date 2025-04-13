import {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  reviews: Review[];
}

// State type
interface ProductState {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  error: string | null;
}

// Action types
type ProductAction =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "SEARCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "SEARCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string };

// Initial state
const initialState: ProductState = {
  products: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Reducer
const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SEARCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, searchResults: action.payload };
    case "SEARCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload, searchResults: [] };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };
    default:
      return state;
  }
};

// Context value type
interface ProductContextType {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  handleSearch: (query: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    try {
      const response = await fetch("https://etemplate-backend.vercel.app/api/products");
      const data: Product[] = await response.json();
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: data });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: message });
    }
  };

  const handleSearch = async (query: string) => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    try {
      const { data } = await axios.get<Product[]>(
        `https://etemplate-backend.vercel.app/api/product/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "SEARCH_PRODUCTS_SUCCESS", payload: data });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "SEARCH_PRODUCTS_FAILURE", payload: message });
    }
  };

  const addProduct = async (formData: FormData) => {
    const response = await fetch("https://etemplate-backend.vercel.app/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to add product");

    const data = await response.json();

    const newProduct: Product = {
      _id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      brand: data.brand,
      stock: data.stock,
      images: data.images,
      reviews: data.reviews,
    };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
  };

  const updateProduct = async (product: Product) => {
    try {
      const response = await fetch(
        `https://etemplate-backend.vercel.app/api/products/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(product),
        }
      );
      const data: Product = await response.json();
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to update product:", message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`https://etemplate-backend.vercel.app/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to delete product:", message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        searchResults: state.searchResults,
        loading: state.loading,
        error: state.error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        handleSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};