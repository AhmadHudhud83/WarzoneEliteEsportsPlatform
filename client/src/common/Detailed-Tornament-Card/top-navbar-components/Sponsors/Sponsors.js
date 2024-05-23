    import React from "react";
    import { useContext } from "react";
    import { useTournamentDetails } from "../..";
    const Sponsors = () => {
    const tournamentDetails = useContext(useTournamentDetails);
    return (
        <React.Fragment>
        {/* {tournamentDetails.sponsors.map((i)=><><h1>{i.name}</h1>
        <h1>{i.email}</h1>
        </>)} */}
        <table className="table table-bordered  table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Sponsor</th>
                <th scope="col">Email</th>
            </tr>
            </thead>
            <tbody>
            {tournamentDetails.sponsors.map((sponsor, index) => {
                return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{sponsor.brand}</td>
                    <td>{sponsor.email}</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </React.Fragment>
    );
    };
    export default Sponsors;
