import { CgSpinner } from 'react-icons/cg';

interface Iprops {
  className?: string;
}
export default function LoadingSpinner({ className }: Iprops) {
  return <CgSpinner className={`animate-spin ${className}`} />;
}
