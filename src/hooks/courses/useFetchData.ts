import { useQueries, useSuspenseQueries } from "@tanstack/react-query";
import {
  getCoursesQueryOptions,
} from "@/api/queries/bdm";
import { transformFetchData } from "@/lib/bdmUtils";

export const useFetchData = (
) => {
  const [CoursesListResult] = 
  useQueries({
      queries: [
        getCoursesQueryOptions(),
      ],
    });

  const [coursesList] =
    transformFetchData(
      CoursesListResult,
    );

  return {
    coursesList,
  };
};
