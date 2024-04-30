import "./Table.css";
import { toBengaliNumber, toBengaliWord } from 'bengali-number';
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { ReactToPrint } from "react-to-print";


const Table = () => {
  const router = useParams();
  const { id } = router;
  const value = `https://ldtax.gov.bd.ldtaxgov.xyz/dakhil/${id}`;
  const componentRef = useRef();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://unofficial1.onrender.com/api/roshid/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const midpoint = Math.ceil(data?.ownerEntries.length / 2);

  // Split the array into two halves
  const firstHalf = data?.ownerEntries.slice(0, midpoint);
  const secondHalf = data?.ownerEntries.slice(midpoint);

  const landMiddle = Math.ceil(data?.landEntries.length / 2);
  const firstHalfLand = data?.landEntries.slice(0, landMiddle);
  const secondHalfLand = data?.landEntries.slice(landMiddle);
  const totalLandArea = data?.landEntries.reduce((sum, entry) => sum + parseFloat(entry.landArea), 0).toFixed(5);

  return (
    <div className="sm:w-[600px] sm:h-full md:mx-32 lg:mx-96">
      <div
        ref={componentRef}
        className="mt-10 mx-5   h-[920px] "
        style={{ background: "white", border: "1px dotted black", }}
      >
        <div className="mx-2 mt-2 ">
          <div className="flex justify-between">
            <p className="text-xs">
              বাংলাদেশ ফরম নং {data?.bangladeshFormNo}
              <br />
              (সংশোধিত)
            </p>
            <p className="text-xs text-end">
              (পরিশিষ্ট: {data?.attachment})
              <br />
              ক্রমিক নং {data?.serialNumber}
            </p>
          </div>
          <h1 className="text-center text-xs mt-5">
            ভূমি উন্নয়ন কর পরিশোধ রসিদ
            <br />
            (অনুচ্ছেদ {data?.paragraphNumber} দ্রষ্টব্য)
          </h1>

          <div className="mt-5">
            <div className="flex items-center">
              <p className="text-xs">
                সিটি কর্পোরেশন /পৌর /ইউনিয়ন ভূমি অফিসের নাম :
              </p>
              <p className="text-xs ml-2 flex-grow">
                {" "}
                {/* Use flex-grow to make it fill remaining space */}
                {data?.landOfficeName}
                <span className="dotted block h-px w-full"></span>{" "}
                {/* Set width to full */}
              </p>
            </div>
            <div className="flex">
              <div className="flex items-center flex-grow">
                <p className="text-xs">অফিস মৌজার ও জে. এল. নং :</p>
                <p className="text-xs ml-2 flex-grow">
                  {data?.mouzaJLNo}
                  <span className="dotted block h-px w-full"></span>{" "}
                  {/* Set width to full */}
                </p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="text-xs">উপজেলা / থানা :</p>
                <p className="text-xs ml-2 flex-grow">
                  {data?.upazilaThana}
                  <span className="dotted block h-px w-full"></span>{" "}
                  {/* Set width to full */}
                </p>
              </div>
              <div className="flex items-center flex-grow">
                <p className="text-xs">জেলা:</p>
                <p className="text-xs ml-2 flex-grow">
                  {data?.district}
                  <span className="dotted block h-px w-full"></span>{" "}
                  {/* Set width to full */}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-xs">২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর :</p>
              <p className="text-xs ml-2 flex-grow">
                {" "}
                {/* Use flex-grow to make it fill remaining space */}
                {data?.holdingNumber}
                <span className="dotted block h-px w-full"></span>{" "}
                {/* Set width to full */}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-xs">খতিয়ান নং:</p>
              <p className="text-xs ml-2 flex-grow">
                {" "}
                {/* Use flex-grow to make it fill remaining space */}
                {data?.khatianNo}
                <span className="dotted block h-px w-full"></span>{" "}
                {/* Set width to full */}
              </p>
            </div>
          </div>

          <div>
            <h1 className="mt-3 text-center text-xs underline">মালিকের বিবরণ</h1>
            <div className={`grid gap-3 mt-3 ${secondHalf?.length === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <table className="text-xs" style={{ border: "1px dotted black" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px dotted black", padding: "5px" }}>
                      ক্রমঃ
                    </th>{" "}
                    {/* Dotted border and padding for cells */}
                    <th style={{ border: "1px dotted black", padding: "5px" }}>
                      মালিকের নাম
                    </th>
                    <th style={{ border: "1px dotted black", padding: "5px" }}>
                      মালিকের অংশ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {firstHalf?.map((rowData, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {toBengaliNumber(index + 1)}
                      </td>
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {rowData?.ownerName}
                      </td>
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {rowData?.ownerShare}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              {
                secondHalf?.length > 0 && (
                  <table className="text-xs" style={{ border: "1px dotted black" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",
                            backgroundColor: "",
                          }}
                        >
                          ক্রমঃ
                        </th>{" "}
                        {/* Header with background color */}
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",

                          }}
                        >
                          মালিকের নাম
                        </th>
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",
                            backgroundColor: "",
                          }}
                        >
                          মালিকের অংশ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        secondHalf?.map((rowData, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {toBengaliNumber(midpoint + 1)}
                            </td>{" "}
                            {/* Data cells */}
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {rowData?.ownerName}
                            </td>
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {rowData?.ownerShare}
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                )
              }
            </div>
          </div>
          <div>
            <h1 className="mt-3 text-center underline text-xs">জমির বিবরণ</h1>
            <div className={`grid gap-3 mt-3 ${secondHalfLand?.length === 0 ? 'grid-cols-1' : 'grid-cols-2'}`}>

              <table className="text-xs" style={{ border: "1px dotted black" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px dotted black",
                        padding: "5px",

                      }}
                    >
                      ক্রমঃ
                    </th>{" "}
                    {/* Header with background color */}
                    <th
                      style={{
                        border: "1px dotted black",
                        padding: "5px",

                      }}
                    >
                      দাগ নং
                    </th>{" "}
                    {/* Header with background color */}
                    <th
                      style={{
                        border: "1px dotted black",
                        padding: "5px",

                      }}
                    >
                      জমির শ্রেণী
                    </th>
                    <th
                      style={{
                        border: "1px dotted black",
                        padding: "5px",

                      }}
                    >
                      জমির পরিমাণ (শতক)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {firstHalfLand?.map((rowData, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {toBengaliNumber(index + 1)}
                      </td>{" "}
                      {/* Data cells */}
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {" "}
                        {rowData?.plotNo}
                      </td>{" "}
                      {/* Data cells */}
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {rowData?.landCategory}
                      </td>
                      <td style={{ border: "1px dotted black", padding: "5px" }}>
                        {rowData?.landArea}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {
                secondHalfLand?.length > 0 && (
                  <table className="text-xs" style={{ border: "1px dotted black" }}>
                    {" "}
                    {/* Dotted border for entire table */}
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",

                          }}
                        >
                          ক্রমঃ
                        </th>{" "}
                        {/* Header with background color */}
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",

                          }}
                        >
                          দাগ নং
                        </th>
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",

                          }}
                        >
                          জমির শ্রেণী
                        </th>
                        <th
                          style={{
                            border: "1px dotted black",
                            padding: "5px",

                          }}
                        >
                          জমির পরিমাণ (শতক)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        secondHalfLand?.map((rowData, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {toBengaliNumber(landMiddle + 1)}
                            </td>{" "}
                            {/* Data cells */}
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {" "}
                              {rowData?.plotNo}
                            </td>{" "}
                            {/* Data cells */}
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {rowData?.landCategory}
                            </td>
                            <td style={{ border: "1px dotted black", padding: "5px" }}>
                              {rowData?.landArea}
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                )
              }
            </div>
            <table className="text-xs"
              style={{
                border: "1px dotted",
                borderCollapse: "collapse",
                margin: "10px 2px",
                width: "100%",
                fontSize: "12px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    className="text-center"
                    style={{ border: "1px dotted black", padding: "5px" }}
                  >
                    সর্বমোট জমি (শতক)
                  </td>
                  <td className="b1 input_bangla" style={{ width: "50%" }}>
                    {toBengaliNumber(totalLandArea)}

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="text-xs"
              style={{
                border: "1px dotted black",
                padding: "5px",
                marginTop: "40px",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="8"
                    style={{
                      border: "1px dotted black",
                      padding: "5px",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    আদায়ের বিবরণ
                  </th>
                </tr>
                <tr>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    তিন বৎসরের ঊর্ধ্বের বকেয়া
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    গত তিন বৎসরের বকেয়া
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    বকেয়ার সুদ ও ক্ষতিপূরণ
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    হাল দাবি
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    মোট দাবি
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    মোট আদায়
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    মোট বকেয়া
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    মন্তব্য
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.arrearLastThreeYears}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.arrearPastThreeYears}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.interestAndCompensation}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.currentClaim}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.totalClaim}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.totalCollection}
                  </td>
                  <td style={{ border: "1px dotted black", padding: "5px" }}>
                    {data?.totalArrear}
                  </td>
                  <td
                    style={{ border: "1px dotted black", padding: "5px" }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2">সর্বমোট (কথায়): {toBengaliWord(244)} ।</p>
          <div className="dotted-divider"></div>
          <div className="grid grid-cols-3 gap-10 text-xs">
            <div className="">
              <p >নোট: {data?.noteBl}</p>
              <p>চালান নং : {data?.challanNo}</p>
              <p className="flex flex-row items-center">
                তারিখ :
                <span>
                  <p className="underline">{data?.dateBangla}</p>
                  <p>{data?.dateEnglish}</p>
                </span>
              </p>
            </div>
            <div className="w-20 ml-10">

              <QRCode size={90}
                style={{ height: "auto", maxWidth: "100%", width: "100%", }}
                value={value} />
            </div>
            <div className="text-xs">
              <p>
                এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে,
                <br />
                কোন স্বাক্ষর প্রয়োজন নেই।
              </p>
            </div>


          </div>
          <div className="dotted lg:mt-44 md:mt-32 sm:mt-32"></div>
          <div className="flex justify-end text-xs">1/1</div>
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-2">
        <ReactToPrint
          trigger={() => (
            <button
              className="btn text-white"
              style={{ backgroundColor: "#4B8DF8" }}
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
          id="print-component"
        />
      </div>
    </div>
  );
};

export default Table;
