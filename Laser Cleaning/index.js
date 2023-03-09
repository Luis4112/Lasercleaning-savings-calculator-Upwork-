
      function calculateSavings() {
        var area = parseFloat(document.getElementById("area").value);
        var costPerSquareMeterTraditional = parseFloat(document.getElementById("cost-per-square-meter").value);
        var costPerSquareMeterLaser = parseFloat(document.getElementById("laser-cleaning-cost").value);
        
        var traditionalCleaningCost = area * costPerSquareMeterTraditional;
        var laserCleaningCost = area * costPerSquareMeterLaser;
        var savings = traditionalCleaningCost - laserCleaningCost;
        
        var savingsResult = document.getElementById("savings-result");
        savingsResult.innerHTML = "By using laser cleaning, you can save: $" + savings.toFixed(2);
      }
      
      // uploading excel, and reading the values.

      let fileData = null;

      function loadExcel() {
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, {type: 'array'});
      
          // Get the worksheet data
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const area = worksheet['A1'].v;
          const costPerSquareMeter = worksheet['B1'].v;
          const laserCleaningCost = worksheet['C1'].v;
      
          // Populate the form fields with the worksheet data
          const areaInput = document.getElementById('area');
          areaInput.value = area;
      
          const costPerSquareMeterInput = document.getElementById('cost-per-square-meter');
          costPerSquareMeterInput.value = costPerSquareMeter;
      
          const laserCleaningCostInput = document.getElementById('laser-cleaning-cost');
          laserCleaningCostInput.value = laserCleaningCost;
          
          fileData = data; // Store the file data for later use
        };
        reader.readAsArrayBuffer(file);
      }
      
      function calculateSavings() {
        const areaInput = document.getElementById('area');
        const costPerSquareMeterInput = document.getElementById('cost-per-square-meter');
        const laserCleaningCostInput = document.getElementById('laser-cleaning-cost');
      
        let area = areaInput.value;
        let costPerSquareMeter = costPerSquareMeterInput.value;
        let laserCleaningCost = laserCleaningCostInput.value;
      
        // Use the values from the uploaded Excel file if available
        if (fileData) {
          const workbook = XLSX.read(fileData, {type: 'array'});
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          area = worksheet['A1'].v;
          costPerSquareMeter = worksheet['B1'].v;
          laserCleaningCost = worksheet['C1'].v;
        }
      
        // Calculate savings and display the result
        const traditionalCleaningCost = area * costPerSquareMeter;
        const laserCleaningCostTotal = area * laserCleaningCost;
        const savings = traditionalCleaningCost - laserCleaningCostTotal;
        
        const savingsResult = document.getElementById('savings-result');
        savingsResult.innerHTML = `By using laser cleaning, you can save ${savings.toFixed(2)} dollars.`;
      }
      