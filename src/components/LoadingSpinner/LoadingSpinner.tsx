import { CgSpinner } from 'react-icons/cg';

interface Iprops {
  className?: string;
  size?: string | number | undefined;
}
export default function LoadingSpinner({ className, size }: Iprops) {
  return <CgSpinner className={`animate-spin ${className}`} size={size} />;
}
