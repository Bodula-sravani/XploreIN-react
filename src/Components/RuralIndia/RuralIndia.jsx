import React from "react";
import "./RuralIndia.css";
import { Card } from "primereact/card";

export const RuralIndia = () => {
  const ruralPlaces = [
    {
      title: "Kutch Adventures India: Community Tourism in Kutch",
      link: "http://www.kutchadventuresindia.com/",
      image:
        "https://www.tripsavvy.com/thmb/EYtjfixFAdVbeM1Ykfmo2i5kvKg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-521718712-59b8ef73b501e80014ae70ab.jpg",
      Description:
        "Kutch Adventures India offers journeys into Gujarat's Great Rann of Kutch to visit artisan villages, as well as the region's famous salt desert. You'll get to watch the artisans in action, as well as experience and get an insight into village life. Stay in mud huts (with attached western bathrooms) or tents at Hodka's village resort, the Shaam-e-Sarhad (Sunset at the Border). It's owned and operated by the Village Tourism Committee of the people of Hodka village. Or, sleep out on a charpoy (traditional woven bed) in a village under the stars.",
    },

    {
      title: "Ecosphere Spiti: High Altitude Rural Tourism",
      link: "https://spitiecosphere.com/",
      image:
        "https://www.tripsavvy.com/thmb/wnc4liuUiVTG1BC_cQFdY2e5cW4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-827013582-59b8ed6e685fbe0011925080.jpg",
      Description:
        "The Spiti Valley in Himachal Pradesh is a lesser-known alternative to Leh and Ladakh. Visits to Buddhist monasteries, yak safaris, treks to villages, village homestays, and cultural performances are some of the possible activities. Ecosphere Spiti, an award winning non-profit organization focused on conservation and responsible tourism, is highly involved in the community there and can make all travel arrangements. They also offer volunteer travel packages, involving a range of community initiatives.",
    },
    {
      title:
        "Tora Eco Resort & Life Experience Center: Sundarbans Village Life",
      link: "https://www.tripsavvy.com/top-sundarban-tour-operators-and-packages-1539452",
      image:
        "https://www.tripsavvy.com/thmb/kYNyl37ImBHMN2XlB9EkotgRgDY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/img_02_b_Snapseed-59b9365e9abed50011027e69.jpg",
      Description:
        "The Sundarbans in West Bengal is a UNESCO World Heritage Site that's notable for being the largest mangrove jungle in the world. About 35% of the Sundarbans lies in India, and this part of it is made up of 102 islands, just over half of which are inhabited. Village life there is challenging. There's no mains water supply, electricity, roads, or cars. People live in homes built from mud and straw, and are constantly wary of attack from tigers. Tora Eco Resort on Bali Island is a unique community-operated tourism project, with six ethnic cottages surrounded by paddy fields. Guests can go on village walks and participate in village activities, as well as explore the narrow canals of the Sundarbans by country boat (similar to a large canoe).",
    },
    {
      title: "Goat Village: Goats and Mountain Views in Uttarakhand",
      link: "https://www.tripadvisor.com/Hotel_Review-g1162507-d8742250-Reviews-The_Goat_Village_Nag_Tibba_by_Bakri_Chhap-Garhwal_Almora_District_Uttarakhand.html",
      image:
        "https://www.tripsavvy.com/thmb/kvEO9cjtwl_inwF92odwyTD1tmc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/171575250-5c8a26f846e0fb00015f908f.jpg",
      Description:
        "Part way up the trekking route (about 20 minutes) to Nag Tibba, Goat Village has 10 attractive earthen Garhwali cottages with mountain views to die for. It was set up to help provide a livelihood for locals to stop them from leaving the area, and enables travelers to experience the local way of life. Organic farming and agriculture are carried out on the property -- including the breeding of goats. You'll get to feast on local delicacies prepared with freshly grown ingredients and completely detox from the rest of the world. Only go there if you value quietness. The Goat Village also has other properties in Uttarakhand.",
    },
    {
      title: "Chandoori Sai Guesthouse: Stay in a Pottery Village in Odisha",
      link: "https://www.chandoorisai.com/",
      image:
        "https://www.tripsavvy.com/thmb/1trq3U07bu8OGU9HCgtlXMFLD1s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/IMG_5408_Snapseed-b81dc8eec5e24fe4a584ce68db8f68c5.jpg",
      Description:
        "Boutique Chandoori Sai Guesthouse in Goudaguda pottery village, in Odisha's far south Koraput district, is a remarkable labor of love for its Australia owner, Leon. He conceptualized and built the guesthouse himself with the help of the local potters whom he recruited to make the terracotta floor tiles, roof tiles, and ornamental urns. Many of the tribal village women are also employed to help run the property. Guests can explore the village at leisure, visit the potters' colony (firing in the traditional-style kiln takes place on weekends) and learn pottery, go on nature walks in the surrounding hills, spend time with the tribal women (they will sing and dance beautifully if asked), watch food being prepared and learn some cooking tips. A local guide from the village leads village-to-village hikes, and there are many fascinating tribal markets held in the area. You can even walk with the village women to the market!",
    },
  ];
  return (
    <>
      <div className="ruralIndia">
        <h1 className="title">Rural Tourism in India</h1>
        <ol>
          {ruralPlaces.map((r) => {
            return (
              <Card className="ruralCard">
                <h2 className="title">
                  <a href={r.link} target="_blank">
                    {r.title}
                  </a>
                </h2>
                <div className="imageContainer">
                  <img src={r.image} alt="Card Image" />
                </div>
                <div className="description">{r.Description}</div>
              </Card>
            );
          })}
        </ol>
        <p>
          These are some of the Places we gathered. More interesting places are
          coming soon
        </p>
      </div>
    </>
  );
};
