export function ProblemList({ problems, onProblemClick }) {
  return (
    <div className="space-y-4 overflow-y-auto">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="grid grid-cols-[50px_4fr_0.7fr_1.3fr] p-4 rounded shadow card">
          <div className="">{i + 1}</div>
          <div className="">Title {i + 1}</div>
          <div className="">Medium</div>
          <div className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">Tag1, Tag2, Tag3, Tag4</div>
        </div>
      ))}
    </div>
  );
}
