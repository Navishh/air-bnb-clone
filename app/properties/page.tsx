import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unautherized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      `
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;

// import getCurrentUser from "../actions/getCurrentUser";
// import getReservations from "../actions/getReservations";
// import ClientOnly from "../components/ClientOnly";
// import EmptyState from "../components/EmptyState";
// import TripsClient from "./TripsClient";

// const TripsPage = async () => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="Unauthorized" subtitle="Please login!" />
//       </ClientOnly>
//     );
//   }

//   const reservations = await getReservations({
//     userId: currentUser.id,
//   });

//   if (reservations?.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No Trips"
//           subtitle="Looks like you haven't reserved any trips"
//         />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <TripsClient reservations={reservations} currentUser={currentUser} />
//     </ClientOnly>
//   );
// };

// export default TripsPage;

// import getCurrentUser from "../actions/getCurrentUser";
// import getReservations from "../actions/getReservations";
// import ClientOnly from "../components/ClientOnly";
// import EmptyState from "../components/EmptyState";
// import TripsClient from "./TripsClient";

// const TripsPage = async () => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="Unauthorized" subtitle="Please login!" />
//       </ClientOnly>
//     );
//   }

//   const reservations = await getReservations({
//     userId: currentUser.id,
//   });

//   if (reservations?.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No Trips"
//           subtitle="Looks like you haven't reserved any trips"
//         />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <TripsClient reservations={reservations} currentUser={currentUser} />
//     </ClientOnly>
//   );
// };

// export default TripsPage;

// import getCurrentUser from "../actions/getCurrentUser";
// import getReservations from "../actions/getReservations";
// import ClientOnly from "../components/ClientOnly";
// import EmptyState from "../components/EmptyState";
// import TripsClient from "./TripsClient";

// const TripsPage = async () => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return (
//       <ClientOnly>
//         <EmptyState title="Unauthorized" subtitle="Please login!" />
//       </ClientOnly>
//     );
//   }

//   const reservations = await getReservations({
//     userId: currentUser.id,
//   });

//   if (reservations?.length === 0) {
//     return (
//       <ClientOnly>
//         <EmptyState
//           title="No Trips"
//           subtitle="Looks like you haven't reserved any trips"
//         />
//       </ClientOnly>
//     );
//   }

//   return (
//     <ClientOnly>
//       <TripsClient reservations={reservations} currentUser={currentUser} />
//     </ClientOnly>
//   );
// };

// export default TripsPage;
