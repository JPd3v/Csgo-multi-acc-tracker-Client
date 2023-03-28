import { Idrop } from 'features/drops/types';

interface Iprops {
  drop: Idrop;
}
export default function Drop({ drop }: Iprops) {
  const { name, price, _id, quality } = drop;
  return (
    <div>
      <div>
        <p>{name}</p>
        <p>{quality}</p>
      </div>
      <p>{price}</p>
    </div>
  );
}
