export default function Members() {
  return (
    <div className="bg-[#F8F5F2] min-h-screen py-8">
      <div className="w-4/5 mx-auto grid gap-8">
        {/* Member 1 */}
        <div className="bg-[#8B1E3F] rounded-md border-[#264653] border-2 text-white p-4 flex justify-end">
          <div className="w-3/5 text-right">
            <p className="text-xl font-semibold text-[#E9C46A]">Tyler Bergsma</p>
            <p className="text-[18px]">Programming</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              consectetur corrupti placeat, doloremque impedit dolorum omnis
              consequatur excepturi doloribus inventore.
            </p>
          </div>
        </div>

        {/* Member 2 */}
        <div className="bg-[#8B1E3F] rounded-md border-[#264653] border-2 text-white p-4 flex justify-start">
          <div className="w-3/5 text-left">
            <p className="text-xl font-semibold text-[#E9C46A]">Tyler Bergsma</p>
            <p className="text-[18px]">Mechanical</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              consectetur corrupti placeat, doloremque impedit dolorum omnis
              consequatur excepturi doloribus inventore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
