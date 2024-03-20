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
      detailsAboutTHeDisease:
        'https://www.gardeningknowhow.com/edible/vegetables/tomato/managing-tomato-mosaic-virus.htm',
    },
    {
      id: 2,
      nameOfDisease: 'Tomato Target Spot Virus',
      detailsAboutTHeDisease:
        'https://www.vegetables.bayer.com/ca/en-ca/resources/agronomic-spotlights/target-spot-of-tomato.html',
    },
    {
      id: 3,
      nameOfDisease: 'Tomato Bacterial Spot Virus',
      detailsAboutTHeDisease:
        'https://extension.umn.edu/disease-management/bacterial-spot-tomato-and-pepper',
    },
    {
      id: 4,
      nameOfDisease: 'Tomato Yellow Leaf Curl Virus',
      detailsAboutTHeDisease:
        'https://ipm.ucanr.edu/agriculture/tomato/tomato-yellow-leaf-curl/',
    },
    {
      id: 5,
      nameOfDisease: 'Tomato Late Blight Virus',
      detailsAboutTHeDisease:
        'https://www.epicgardening.com/late-blight-tomatoes/',
    },
    {
      id: 6,
      nameOfDisease: 'Tomato Leaf Mold Virus',
      detailsAboutTHeDisease:
        'https://www.gardeningknowhow.com/edible/vegetables/tomato/managing-tomato-leaf-mold.htm',
    },
    {
      id: 7,
      nameOfDisease: 'Tomato Early Blight Virus',
      detailsAboutTHeDisease:
        'https://gardenerspath.com/how-to/disease-and-pests/early-blight-tomato/',
    },
    {
      id: 8,
      nameOfDisease: 'Tomato Spider Mites Two Spotted Spider Mite',
      detailsAboutTHeDisease:
        'https://extension.psu.edu/two-spotted-spider-mite-on-vegetables',
    },
    {
      id: 9,
      nameOfDisease: 'Tomato Septoria Leaf Spot',
      detailsAboutTHeDisease:
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
                className="p-6 border-2 border-solid mb-5 border-indigo-500 rounded-xl bg-gray-50 flex flex-col gap-4 text-lg tracking-wider shadow-lg"
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
                    Details of the Disease:{' '}
                  </span>{' '}
                  <span className="text-indigo-700 font-semibold hover:underline">
                    {' '}
                    <a href={resource.detailsAboutTHeDisease} target="_blank">
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
