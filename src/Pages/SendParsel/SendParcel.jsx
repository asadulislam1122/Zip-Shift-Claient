import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  // console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSendParsel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistricts === data.receiverDistrict;
    const parselWeight = parseFloat(data.parcelWeight);
    // console.log(sameDistrict);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parselWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parselWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;
    //
    Swal.fire({
      title: "Agree With the Cost ?",
      text: `You will be Charge (${cost}) taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        //  save the  parsel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcels", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title:
                "<span style='font-size:18px;font-weight:600'>Parcel Created Successfully</span>",
              html: "<small style='color:#555'>Please complete your payment</small>",
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
                popup:
                  "animate__animated animate__fadeInDown rounded-xl shadow-xl",
              },
            });
          }
        });
      }
    });
  };
  const serviceSenter = useLoaderData();
  //   console.log(serviceSenter);
  const regionsDuplicate = serviceSenter.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  //   console.log(regions);
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
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
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
              required
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
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender name"
            />
            {/* sender Email */}
            <label className="label mt-6">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
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
            {/* Sender Districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistricts")}
                defaultValue="Pick a districts"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a Districts</option>

                {districtByRegions(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

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
              required
            />
            {/* Receiver Email */}
            <label className="label mt-6">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="asadulislam@gmail.com"
              required
            />

            {/* Receiver Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
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

            {/* receiver District */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a District</option>

                {districtByRegions(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver Phone Number   */}

            <label className="label mt-4">Receiver Phone No</label>
            <input
              type="number"
              {...register("receiverphoneNo")}
              className="input w-full"
              placeholder="Receiver Phone Number"
              required
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
        <div className="flex justify-end">
          <input
            className=" mt-5 mb-4 btn btn-primary text-secondary
        "
            type="submit"
            value="Send Parsel"
          />
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
