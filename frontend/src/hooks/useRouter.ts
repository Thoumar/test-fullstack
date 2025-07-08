import { useNavigate, useLocation } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => {
      if (typeof path === 'string') {
        navigate(path);
      } else {
        navigate(path.pathname + path.search);
      }
    },
  };
}
