import Link from 'next/link';

interface BtnNextProps {
  dictionary: any;
  lang: string;
  organization: string;
  role: string;
  course_id: number;
}

const BtnNext: React.FC<BtnNextProps> = ({ dictionary, lang, organization, role, course_id }) => {
  return (
    <Link href={`/course/${lang}/${organization}/${role}/presentation?course-id=${course_id}`} passHref>
      <button className="btn bg-[#0F0E9A] max-w-80 text-gray-50">
        {dictionary.nextbtn}
      </button>
    </Link>
  );
};

export default BtnNext;
