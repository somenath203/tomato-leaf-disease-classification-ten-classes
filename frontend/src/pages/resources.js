/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */


import ProtectedRouteNavbar from '../components/ProtectedRouteNavbar';

const Resources = () => {
  const resources = [
    {
      id: 1,
      nameOfDisease: 'Tomato Mosaic Virus',
      definitionOfTheDisease: 'Tomato Mosaic Virus (ToMV) is a plant pathogenic virus belonging to the genus Tobamovirus. It is known for its worldwide prevalence and impact on tomatoes and a wide range of other plants, including many agricultural crops and ornamental plants. ToMV is characterized by its rod-shaped structure and ability to remain infectious for many years, even in desiccated plant detritus.',
      symptomsOfTheDisease: 'Infected tomato plants exhibit mottling with alternating yellowish and darker green areas, often with a blister-like appearance. Leaves may appear fern-like with pointed tips and younger leaves could be twisted. The fruit may show distortions, yellow blotches, necrotic spots, and internal browning. Overall, the plant may be stunted, with reduced fruit set and discolored flowers.',
      cureOfTheDisease: 'Unfortunately, there is no cure for ToMV once a plant is infected. Control strategies focus on prevention, such as using virus-free seeds, sterilizing tools, and removing infected plants to prevent spread. Hands and tools can be dipped in milk to inactivate the virus on surfaces. It’s crucial to manage the disease by reducing sources of the virus and controlling insect infestations.',
      linkOfTheDisease:
        'https://www.gardeningknowhow.com/edible/vegetables/tomato/managing-tomato-mosaic-virus.htm',
    },
    {
      id: 2,
      nameOfDisease: 'Tomato Target Spot Virus',
      definitionOfTheDisease: 'Tomato Target Spot is a significant fungal disease affecting tomatoes, primarily in tropical and subtropical regions. It\'s caused by Corynespora cassiicola, a pathogen with a broad host range, impacting over 500 plant species. The disease can reduce yield by diminishing the photosynthetic area and creating blemishes on fruits, affecting their marketability.',
      symptomsOfTheDisease: 'The disease manifests as pinpoint-sized, water-soaked spots on leaves, which develop into necrotic lesions with light brown centers and dark margins. These lesions may enlarge, forming circular spots with concentric rings, resembling targets. Infected leaves may drop prematurely, and fruit lesions can appear, reducing the plant\'s overall health.',
      cureOfTheDisease: 'Managing Tomato Target Spot involves cultural practices and fungicide applications. Preventive measures include removing plant debris post-harvest, rotating crops, ensuring good air circulation, and watering at the base to keep leaves dry. Fungal sprays may be used early in the season or upon noticing the disease.',
      linkOfTheDisease:
        'https://www.vegetables.bayer.com/ca/en-ca/resources/agronomic-spotlights/target-spot-of-tomato.html',
    },
    {
      id: 3,
      nameOfDisease: 'Tomato Bacterial Spot Virus',
      definitionOfTheDisease: 'Tomato Bacterial Spot is a common and destructive disease affecting tomatoes, caused by a group of bacteria including Xanthomonas vesicatoria, Xanthomonas euvesicatoria, Xanthomonas gardneri, and Xanthomonas perforans. It can lead to significant yield loss and is characterized by lesions on leaves, stems, and fruits. The bacteria can survive in tomato debris and are spread by rain and contaminated equipment.',
      symptomsOfTheDisease: 'Symptoms include small, water-soaked, circular spots on leaves that may turn yellow-green and eventually brownish-red. Severe infections can cause extensive leaf yellowing and loss. On fruits, spots start small and raised, becoming larger, brown, and scabby as they mature. The disease thrives in warm, wet conditions and can be exacerbated by wind-driven rain.',
      cureOfTheDisease: 'There is no cure for plants once they are infected with Tomato Bacterial Spot. Management focuses on prevention, such as using pathogen-free seeds, avoiding overhead watering, and removing infected plants. Infected plant material should be burned, buried, or hot composted to prevent the spread of the bacteria. Contaminated fruit should not be consumed as it may harbor human pathogens.',
      linkOfTheDisease:
        'https://extension.umn.edu/disease-management/bacterial-spot-tomato-and-pepper',
    },
    {
      id: 4,
      nameOfDisease: 'Tomato Yellow Leaf Curl Virus',
      definitionOfTheDisease: 'Tomato Yellow Leaf Curl Virus (TYLCV) is a DNA virus from the genus Begomovirus and the family Geminiviridae. It is notorious for causing one of the most destructive diseases in tomatoes, prevalent in tropical and subtropical regions. TYLCV is transmitted by the whitefly Bemisia tabaci and can lead to severe economic losses due to its impact on tomato yield.',
      symptomsOfTheDisease: 'Infected plants exhibit yellowing between the veins, upward curling of leaves, stunted growth, and reduced leaf size. The disease causes significant yield loss, with symptoms including interveinal and marginal chlorosis of young leaves, a crumpled appearance, and bushiness due to shortened internode length.',
      cureOfTheDisease: 'There is no cure for TYLCV once a plant is infected. Management strategies include controlling the whitefly population, using virus-free planting material, and applying insecticides to manage the vector. Infected plants should be removed and destroyed to prevent further spread of the virus.',
      linkOfTheDisease:
        'https://ipm.ucanr.edu/agriculture/tomato/tomato-yellow-leaf-curl/',
    },
    {
      id: 5,
      nameOfDisease: 'Tomato Late Blight Virus',
      definitionOfTheDisease: 'Tomato Late Blight is a disease caused by the oomycete pathogen Phytophthora infestans. It affects tomatoes and potatoes, leading to significant crop loss. This pathogen is known for causing the Irish potato famine in the 1840s. Late Blight is characterized by its rapid spread and ability to infect all above-ground parts of the plant.',
      symptomsOfTheDisease: 'The disease presents as irregularly shaped, water-soaked lesions on leaves, often with a lighter halo. White cottony growth may appear on the underside of leaves in high humidity. Lesions enlarge, causing leaves to brown, shrivel, and die. The fruit can develop firm, greasy spots that become leathery and brown.',
      cureOfTheDisease: 'While there is no cure for Late Blight, management includes sanitation, crop rotation, and fungicide applications. Infected plants should be removed and destroyed. Preventive measures such as using resistant varieties and ensuring good air circulation can help reduce the risk of infection. Fungicides containing copper, chlorothalonil, or mancozeb are recommended for protection.',
      linkOfTheDisease:
        'https://www.epicgardening.com/late-blight-tomatoes/',
    },
    {
      id: 6,
      nameOfDisease: 'Tomato Leaf Mold Virus',
      definitionOfTheDisease: 'Tomato Leaf Mold is a fungal disease caused by Passalora fulva (formerly known as Cladosporium fulvum), affecting primarily tomato plants, especially in greenhouses. It is a non-obligate pathogen that thrives in cool, humid conditions and is known for causing significant issues in tomato cultivation during fall, early winter, and spring.',
      symptomsOfTheDisease: 'The disease starts with pale green or yellowish spots on the upper leaf surface, which may develop into olive green to grayish purple velvety patches on the underside, composed of spores. Infected leaves may curl, dry, and drop prematurely, leading to defoliation and further infection. It typically affects older leaves first, then progresses to younger foliage.',
      cureOfTheDisease: 'Management of Tomato Leaf Mold includes using disease-free seeds, removing and destroying crop debris post-harvest, and sanitizing the greenhouse between crop seasons. Minimizing leaf wetness by avoiding overhead watering, using fans, staking, and pruning plants to increase ventilation are also effective. Fungicides can be applied at the first sign of infection according to manufacturer\'s instructions.',
      linkOfTheDisease:
        'https://www.gardeningknowhow.com/edible/vegetables/tomato/managing-tomato-leaf-mold.htm',
    },
    {
      id: 7,
      nameOfDisease: 'Tomato Early Blight Virus',
      definitionOfTheDisease: 'Tomato Early Blight is a disease caused by the fungus Alternaria solani. It primarily affects tomato and potato plants, leading to lesions on leaves, stems, and fruits. This disease can occur at any stage of plant development and is more common in the field, but can also affect seedlings in greenhouses.',
      symptomsOfTheDisease: 'Early Blight symptoms include dark brown or black spots with concentric rings on leaves, starting from the bottom. These spots may expand, turn yellow, and cause leaves to dry up or fall off. Lesions on the fruit start at the stem end, forming dark, sunken areas.',
      cureOfTheDisease: 'To manage Early Blight, remove and destroy infected plant parts and apply fungicides like copper fungicide. Cultural controls such as crop rotation, purging nightshades, and keeping plants dry are crucial. Organic treatments and staking plants for better air circulation can also help prevent the disease.',
      linkOfTheDisease:
        'https://gardenerspath.com/how-to/disease-and-pests/early-blight-tomato/',
    },
    {
      id: 8,
      nameOfDisease: 'Tomato Spider Mites Two Spotted Spider Mite',
      definitionOfTheDisease: 'The Two-Spotted Spider Mite, Tetranychus urticae, is a common pest that attacks a variety of plants, including tomatoes. These mites are tiny, sap-sucking arachnids that can cause significant damage to crops. They thrive in hot, dry conditions and can reproduce rapidly, leading to large infestations if not controlled.',
      symptomsOfTheDisease: 'Infestations start with tiny white or yellow spots on the leaves, known as stippling. As mite numbers increase, leaves may become bronzed or yellowed, and webbing can appear. Severe infestations lead to leaf drop, reduced plant vigor, and potentially plant death if left unchecked.',
      cureOfTheDisease: 'Early detection and treatment are key. Spraying with water can dislodge mites, and applications of neem oil can control populations. In severe cases, insecticidal sprays may be necessary. Introducing beneficial insects like ladybugs can also help manage mite numbers naturally.',
      linkOfTheDisease:
        'https://extension.psu.edu/two-spotted-spider-mite-on-vegetables',
    },
    {
      id: 9,
      nameOfDisease: 'Tomato Septoria Leaf Spot',
      definitionOfTheDisease: 'Tomato Septoria Leaf Spot is a common fungal disease caused by Septoria lycopersici. It primarily affects tomato plants but can also impact other members of the Solanaceae family. The disease is characterized by small, circular spots on the foliage, which do not typically affect the fruit. It can spread rapidly, especially under warm and humid conditions, leading to defoliation and reduced plant vigor.',
      symptomsOfTheDisease: 'The symptoms include small, circular gray or tan spots with dark brown margins on the leaves, often surrounded by a yellow halo. These spots may enlarge and merge, leading to yellowing and eventual browning and death of the leaves. The disease usually starts on the lower, older leaves and can move up the plant if untreated, potentially causing sun scalding of exposed fruits.',
      cureOfTheDisease: 'To manage Septoria Leaf Spot, remove affected foliage, avoid overhead watering to keep leaves dry, and apply fungicides containing copper or potassium bicarbonate. Good crop rotation practices and ensuring proper plant spacing for air circulation are also effective preventive measures. Fungicides should be applied on a regular schedule, starting after blossom drop when the first fruits are visible.',
      linkOfTheDisease:
        'https://gardenerspath.com/how-to/disease-and-pests/septoria-leaf-spot-tomatoes/',
    },
  ];

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <ProtectedRouteNavbar />

          <section className="mx-auto w-11/12">
            <p className="text-center text-3xl font-bold tracking-wide text-indigo-500 mb-16">
              RESOURCES
            </p>

            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-6 border-2 border-solid mb-5 border-indigo-500 rounded-xl bg-gray-50 flex flex-col gap-5 text-lg tracking-wider shadow-lg"
              >
                <p>
                  {' '}
                  <span className="text-indigo-500 font-semibold">
                    Disease Name:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold">
                    {resource.nameOfDisease}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  <span className="text-indigo-500 font-semibold">
                    About the Disease:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold">
                    {resource.definitionOfTheDisease}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  <span className="text-indigo-500 font-semibold">
                    Symptoms of the Disease:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold">
                    {resource.symptomsOfTheDisease}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  <span className="text-indigo-500 font-semibold">
                    Cure of the Disease:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold">
                    {resource.cureOfTheDisease}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  <span className="text-indigo-500 font-semibold">
                    More about the Disease:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold hover:underline">
                    {' '}
                    <a href={resource.linkOfTheDisease} target="_blank">
                      Link to Detail of this Disease
                    </a>
                  </span>{' '}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Resources;
