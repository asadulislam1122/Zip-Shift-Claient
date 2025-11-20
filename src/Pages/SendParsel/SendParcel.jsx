import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSendParsel = (data) => {
    console.log(data);
  };
  const serviceSenter = useLoaderData();
  //   console.log(serviceSenter);
  const regionsDuplicate = serviceSenter.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = watch("senderRegion");
  //   console.log(regions);
  //
  const districtByRegions = (region) => {
    const regionsDestrict = serviceSenter.filter((c) => c.region === region);
    const districts = regionsDestrict.map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className="text-5xl mt-6 font-bold">Send A Parsel</h2>
      <form onSubmit={handleSubmit(handleSendParsel)} className="mt-12 p-4">
        {/* parsel Type */}
        <div className="text-black">
          <label className="label">
            {" "}
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          {/*  */}
          <label className="label ml-5">
            {" "}
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* name , whets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <fieldset className="fieldset">
            <label className="label">Parcel name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two Colam  */}
        {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}
        <div className="grid grid-cols-1 mt-8 gap-10 md:grid-cols-2">
          {/* sender */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender Name */}
            <label className="label mt-6">Sender name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="Sender name"
            />
            {/* sender Email */}
            <label className="label mt-6">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
              placeholder="asadulislam@gmail.com"
            />

            {/* Sender Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
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
            {/* Sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistricts")}
                defaultValue="Pick a districts"
                className="select w-full"
              >
                <option disabled={true}>Pick a Districts</option>

                {districtByRegions(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender Address */}

            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full "
              placeholder="Sender Address"
            />

            {/* sender Phone Number   */}

            <label className="label mt-4">Sender Phone No</label>
            <input
              type="number"
              {...register("senderphoneNo")}
              className="input w-full"
              placeholder="Sender Phone Number"
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
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* receiver name */}
            <label className="label mt-6">Receiver name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver name"
            />
            {/* Receiver Email */}
            <label className="label mt-6">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="asadulislam@gmail.com"
            />
            {/* Receiver District */}

            <label className="label mt-4">Receiver District</label>
            <input
              type="text"
              {...register("receiverDistrict")}
              className="input w-full"
              placeholder="Receiver Destrict"
            />
            {/* Receiver Address */}

            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full "
              placeholder="Receiver Address"
            />

            {/* Receiver Phone Number   */}

            <label className="label mt-4">Receiver Phone No</label>
            <input
              type="number"
              {...register("receiverphoneNo")}
              className="input w-full"
              placeholder="Receiver Phone Number"
            />

            {/* pickup Instruction */}

            <label className="label mt-4">Delivery Instrauction</label>
            <input
              type="text"
              {...register("deliveryInstrauction")}
              className="input w-full"
              placeholder="Delivery Instrauction"
            />
          </fieldset>
          {/* Receiver end */}
        </div>
        {/* button */}
        <input
          className=" btn btn-primary text-secondary
        "
          type="submit"
          value="Send Parsel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
