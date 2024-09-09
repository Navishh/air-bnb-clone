"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            // reservation={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId == listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;

// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useCallback, useState } from "react";
// import toast from "react-hot-toast";
// import Container from "../components/Container";
// import Heading from "../components/Heading";
// import ListingCard from "../components/listings/ListingCard";
// import { SafeReservation, SafeUser } from "../types";

// interface TripsClientProps {
//   reservations: SafeReservation[];
//   currentUser?: SafeUser | null;
// }

// const TripsClient: React.FC<TripsClientProps> = ({
//   reservations: initialReservations,
//   currentUser,
// }) => {
//   const router = useRouter();
//   const [reservations, setReservations] =
//     useState<SafeReservation[]>(initialReservations);
//   const [deletingId, setDeletingId] = useState("");

//   const onCancel = useCallback(
//     (id: string) => {
//       setDeletingId(id);

//       axios
//         .delete(`/api/reservations/${id}`)
//         .then(() => {
//           toast.success("Reservation cancelled");
//           setReservations((prev) =>
//             prev.filter((reservation) => reservation.id !== id)
//           );
//           router.refresh(); // Refresh the page to fetch the latest data
//         })
//         .catch((error) => {
//           toast.error(error?.response?.data?.error);
//         })
//         .finally(() => {
//           setDeletingId("");
//         });
//     },
//     [router]
//   );

//   return (
//     <Container>
//       <Heading
//         title="Trips"
//         subtitle="Where you've been and where you're going"
//       />
//       <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//         {reservations.map((reservation) => (
//           <ListingCard
//             key={reservation.id}
//             data={reservation.listing}
//             reservation={reservation}
//             actionId={reservation.id}
//             onAction={onCancel}
//             disabled={deletingId == reservation.id}
//             actionLabel="Cancel Reservation"
//             currentUser={currentUser}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default TripsClient;

// "use client";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useCallback, useState } from "react";
// import toast from "react-hot-toast";
// import Container from "../components/Container";
// import Heading from "../components/Heading";
// import ListingCard from "../components/listings/ListingCard";
// import { SafeReservation, SafeUser } from "../types";

// interface TripsClientProps {
//   reservations: SafeReservation[];
//   currentUser?: SafeUser | null;
// }

// const TripsClient: React.FC<TripsClientProps> = ({
//   reservations: initialReservations,
//   currentUser,
// }) => {
//   const router = useRouter();
//   const [reservations, setReservations] =
//     useState<SafeReservation[]>(initialReservations);
//   const [deletingId, setDeletingId] = useState("");

//   const onCancel = useCallback(
//     (id: string) => {
//       setDeletingId(id);

//       axios
//         .delete(`/api/reservations/${id}`)
//         .then(() => {
//           toast.success("Reservation cancelled");
//           setReservations((prev) =>
//             prev.filter((reservation) => reservation.id !== id)
//           );
//           router.refresh(); // Refresh the page to fetch the latest data
//         })
//         .catch((error) => {
//           toast.error(error?.response?.data?.error);
//         })
//         .finally(() => {
//           setDeletingId("");
//         });
//     },
//     [router]
//   );

//   return (
//     <Container>
//       <Heading
//         title="Trips"
//         subtitle="Where you've been and where you're going"
//       />
//       <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//         {reservations.map((reservation) => (
//           <ListingCard
//             key={reservation.id}
//             data={reservation.listing}
//             reservation={reservation}
//             actionId={reservation.id}
//             onAction={onCancel}
//             disabled={deletingId == reservation.id}
//             actionLabel="Cancel Reservation"
//             currentUser={currentUser}
//           />
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default TripsClient;
