import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Raider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  // console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const serviceSenter = useLoaderData();
  //   console.log(serviceSenter);
  const regionsDuplicate = serviceSenter.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];

  const districtByRegions = (region) => {
    const regionsDestrict = serviceSenter.filter((c) => c.region === region);
    const districts = regionsDestrict.map((d) => d.district);
    return districts;
  };

  const raiderRegion = useWatch({ control, name: "region" });
  const handleRaiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "<span style='font-size:18px;font-weight:600'>Your Application has been Submited</span>",
          html: "<small style='color:#555'>We will reach to you in 99 days</small>",
          background: "rgba(255, 255, 255, 0.85)",
          backdrop: `
            rgba(0,0,0,0.1)
            left top
            no-repeat
          `,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          toast: true,
          customClass: {
            popup: "animate__animated animate__fadeInDown rounded-xl shadow-xl",
          },
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl text-center p-4 text-green-500 font-semibold">
        Be a raider
      </h2>
      <form
        onSubmit={handleSubmit(handleRaiderApplication)}
        className="mt-4 p-4"
      >
        {/* two Colam  */}
        {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}
        <div className="w-8/12 mx-auto">
          {/* raider*/}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Raider Details</h4>
            {/* Raider Name */}
            <label className="label mt-6">Raider name</label>
            <input
              type="text"
              {...register("raiderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Raider name"
            />
            {/* sender Email */}
            <label className="label mt-6">Email</label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="asadulislam@gmail.com"
            />

            {/* Sender Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Raider Region</legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/*  */}
            {/* Raider Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend"> Districts</legend>
              <select
                {...register("districts")}
                defaultValue="Pick a districts"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a Districts</option>

                {districtByRegions(raiderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Raider Phone Number   */}

            <label className="label mt-4">Raider Phone No</label>
            <input
              type="number"
              {...register("raiderPhoneNo")}
              className="input w-full"
              placeholder="Raider Phone Number"
            />

            {/* pickup Instruction */}

            <label className="label mt-4">Pickup Instrauction</label>
            <input
              type="text"
              {...register("pickupInstrauction")}
              className="input w-full"
              placeholder="Pickup Instrauction"
            />
          </fieldset>
          {/* sender end */}
          {/* resevar */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Details</h4>
            {/* Driving Licence */}
            <label className="label mt-6">Driving License</label>
            <input
              type="text"
              {...register("licence")}
              className="input w-full"
              placeholder="Driving License"
              required
            />
            {/* NID */}
            <label className="label mt-6">NID</label>
            <input
              type="numder"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
              required
            />

            {/* BIKE INFO */}

            <label className="label mt-4">Bike Info</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="bike information"
            />
          </fieldset>
          {/* Receiver end */}
        </div>
        {/* button */}
        <div className="flex justify-end w-8/12 mx-auto">
          <input
            className=" mt-5 mb-4 btn btn-primary text-secondary
        "
            type="submit"
            value="Apply Raider"
          />
        </div>
      </form>
    </div>
  );
};

export default Raider;
