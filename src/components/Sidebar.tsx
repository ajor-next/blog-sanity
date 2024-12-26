interface SidebarProps {
    categories: { _id: string; title: string }[];
    onSelectCategory: (categoryId: string | null) => void;
  }
  
  const Sidebar = ({ categories, onSelectCategory }: SidebarProps) => {
    return (
      <aside className="w-64 h-screen bg-gray-100 shadow-lg p-4">
        {/* Header */}
        <div className="text-xl font-bold mb-4">All Tags</div>
  
        {/* Scrollable Tags Section */}
        <div className="overflow-y-auto max-h-[calc(100vh-5rem)]">
          <ul className="space-y-2">
            <li
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition cursor-pointer"
              onClick={() => onSelectCategory(null)}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition cursor-pointer"
                onClick={() => onSelectCategory(category._id)}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;