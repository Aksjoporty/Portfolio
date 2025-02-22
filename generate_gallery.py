import os
import json

BASE_DIR = "images"
OUTPUT_FILE = "gallery.json"

def get_images_from_folder(folder):
    valid_extensions = (".jpg", ".jpeg", ".png", ".gif")
    return [f for f in os.listdir(folder) if f.lower().endswith(valid_extensions)]

def generate_gallery_json():
    gallery_data = {}

    # Scan through folders in the base directory
    for category in os.listdir(BASE_DIR):
        category_path = os.path.join(BASE_DIR, category)

        if os.path.isdir(category_path):
            images = get_images_from_folder(category_path)

            if images:
                # Convert paths to use forward slashes
                gallery_data[category] = [
                    os.path.join(BASE_DIR, category, img).replace("\\", "/") 
                    for img in images
                ]

    # Save JSON file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(gallery_data, f, indent=4, ensure_ascii=False)

    print(f"✅ JSON file generated: {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_gallery_json()