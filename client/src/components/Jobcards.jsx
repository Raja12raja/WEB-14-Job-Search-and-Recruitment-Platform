function Jobcards({ title, idx }) {
  let description = [
    "A software development company specializes in creating, designing, deploying, and maintaining software for various clients, ranging from small businesses to large enterprises.",
    "A finance analytics company specializes in leveraging data analytics and financial expertise to provide insights, solutions, and strategies that help organizations make informed financial decisions. ",
  ];
  let location = ["hyderabad", "banglore"];
  let jobtype = ["offline", "online"];
  return (
    <div className="Jobcards">
      <h4>{title}</h4>
      <p>Location:{location[idx]}</p>
      <p>jobtype:{jobtype[idx]}</p>
      <p>{description[idx]}</p>
    </div>
  );
}

export default Jobcards;
