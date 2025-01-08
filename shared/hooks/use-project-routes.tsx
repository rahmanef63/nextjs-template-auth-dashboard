import { useLocation, useNavigate } from "react-router-dom";
import { useNavigation } from "./use-navigation";

export const useProjectRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeRole } = useNavigation();

  const getProjectPath = (path: string) => {
    return `/${activeRole}/projects/${path}`;
  };

  const navigateToProject = (path: string) => {
    const fullPath = getProjectPath(path);
    console.log('Navigating to project path:', fullPath);
    navigate(fullPath);
  };

  const isProjectRoute = (path: string) => {
    const fullPath = getProjectPath(path);
    return location.pathname === fullPath;
  };

  return {
    getProjectPath,
    navigateToProject,
    isProjectRoute,
    currentPath: location.pathname
  };
};