import { useRouter } from "next/router";
import { useNavigation } from "../navigation/hooks/use-navigation";

export const useProjectRoutes = () => {
  const router = useRouter();
  const { activeRole } = useNavigation();

  const getProjectPath = (path: string) => {
    return `/${activeRole}/projects/${path}`;
  };

  const navigateToProject = (path: string) => {
    const fullPath = getProjectPath(path);
    console.log('Navigating to project path:', fullPath);
    router.push(fullPath);
  };

  const isProjectRoute = (path: string) => {
    const fullPath = getProjectPath(path);
    return router.pathname === fullPath;
  };

  return {
    getProjectPath,
    navigateToProject,
    isProjectRoute,
    currentPath: router.pathname
  };
};