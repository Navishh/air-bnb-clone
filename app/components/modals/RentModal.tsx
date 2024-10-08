// // "use client";
// "use client";
// import useRentModal from "@/app/hooks/useRentModal";
// import dynamic from "next/dynamic";
// import { useMemo, useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { categories } from "../categories/allcategories";
// import Heading from "../Heading";
// import CategoryInput from "../inputs/CategoryInput";
// import CountrySelect from "../inputs/CountrySelect";
// import Modal from "./Modal";

// enum STEPS {
//   CATEGORY = 0,
//   LOCATION = 1,
//   INFO = 2,
//   IMAGES = 3,
//   DESCRIPTION = 4,
//   PRICE = 5,
// }

// const RentModal = () => {
//   const rentModal = useRentModal();

//   const [step, setStep] = useState(STEPS.CATEGORY);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<FieldValues>({
//     defaultValues: {
//       category: "",
//       location: null,
//       guestCount: 1,
//       roomCount: 1,
//       bathroomCount: 1,
//       imageSrc: "",
//       price: 1,
//       title: "",
//       description: "",
//     },
//   });

//   const category = watch("category");
//   const location = watch("location");

//   const Map = useMemo(
//     () =>
//       dynamic(() => import("../Map"), {
//         ssr: false,
//       }),
//     [location]
//   );

//   const setCustomValue = (id: string, value: any) => {
//     setValue(id, value, {
//       shouldValidate: true,
//       shouldDirty: true,
//       shouldTouch: true,
//     });
//   };

//   const onBack = () => {
//     setStep((value) => value - 1);
//   };

//   const onNext = () => {
//     setStep((value) => value + 1);
//   };

//   const actionLabel = useMemo(() => {
//     if (step == STEPS.PRICE) {
//       return "Create";
//     }
//     return "Next";
//   }, [step]);

//   const secondaryActionLabel = useMemo(() => {
//     if (step == STEPS.CATEGORY) {
//       return undefined;
//     }
//     return "Back";
//   }, [step]);

//   //body content
//   let bodyContent = (
//     <div className="flex flex-col gap-8 ">
//       <Heading
//         title="Which of these best describes your place?"
//         subtitle="Pick a cetegory"
//       />
//       <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
//         {categories.map((item) => (
//           <div key={item.label} className="col-span-1">
//             <CategoryInput
//               onClick={(category) => setCustomValue("category", category)}
//               selected={category == item.label}
//               label={item.label}
//               icon={item.icon}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   if (step == STEPS.LOCATION) {
//     bodyContent = (
//       <div className="flex flex-col gap-8 ">
//         <Heading
//           title="Where is your place located?"
//           subtitle="Help guests find you!"
//         />

//         <CountrySelect
//           value={location}
//           onChange={(value) => setCustomValue("location", value)}
//         />

//         <Map />
//       </div>
//     );
//   }

//   return (
//     <Modal
//       isOpen={rentModal.isOpen}
//       onClose={rentModal.onClose}
//       onSubmit={onNext}
//       actionLabel={actionLabel}
//       secondaryActionLabel={secondaryActionLabel}
//       secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
//       title="Airbnb your home!"
//       body={bodyContent}
//     />
//   );
// };

// export default RentModal;
"use client";
import useRentModal from "@/app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { categories } from "../categories/allcategories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Inputs";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   if (step != STEPS.PRICE) {
  //     return onNext();
  //   }

  //   setIsLoading(true);

  //   axios
  //     .post("/api/listings/route.ts", data)
  //     .then(() => {
  //       toast.success("Listing Created!");
  //       router.refresh();
  //       reset();
  //       setStep(STEPS.CATEGORY);
  //       rentModal.onClose();
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong!");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", {
        ...data,
        ImageSrc: data.imageSrc, // Ensure correct key casing
        bathRoomCount: data.bathroomCount, // Consistency in naming
      })
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        console.error("Error creating listing:", error); // Log error details
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     const response = await fetch("/api/listings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || "Something went wrong");
  //     }

  //     const result = await response.json();
  //     toast.success("Listing Created!");
  //     router.refresh();
  //     reset();
  //     setStep(0);
  //     rentModal.onClose();
  //   } catch (error) {
  //     console.error("Error creating listing:", error);
  //     toast.error("Something went wrong!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch('/api/listings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || 'Something went wrong');
  //     }

  //     const result = await response.json();
  //     console.log('Listing created:', result);
  //   } catch (error) {
  //     console.error('Error creating listing:', error);
  //     alert(error.message);
  //   }
  // };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  //body content
  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have? "
        />
        {/* guests */}
        <Counter
          title="Guests"
          subtitle=" How many guests do you allow?"
          value={guestCount}
          onchange={(value) => setCustomValue("guestCount", value)}
        />
        {/* rooms */}
        <Counter
          title="Rooms"
          subtitle=" How many rooms do you allow?"
          value={roomCount}
          onchange={(value) => setCustomValue("roomCount", value)}
        />
        {/* bathrooms */}
        <Counter
          title="Bathrooms"
          subtitle=" How many bathrooms do you allow?"
          value={bathroomCount}
          onchange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step == STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="Add a photo of your place"
          subtitle=" Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step == STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="How would you like to describe your place? "
          subtitle=" Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step == STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="Now, set your price"
          subtitle=" How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
