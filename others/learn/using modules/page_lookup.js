exports.get_path = function(page_name)
{
	var root_dir = "../web-pages/";
	var customer_dir = root_dir + "customer-view";
	var admin_dir = root_dir + "admin-view";
	//console.log(page_name);
	switch (page_name) {
		/* exterior pages */
		/********************************************/
	    case "/signin.html":
	        return root_dir + page_name; 
	    case "/signup.html":
	        return root_dir + page_name;
	        
	    /* customer view */
	    /********************************************/
	    case "/home.html":
	        return customer_dir + page_name;
	        
        case "/cart.html":
	        return customer_dir + page_name;
	        
        case "/checkout.html":
	        return customer_dir + page_name;
	        
        case "/account.html":
	        return customer_dir + page_name;
	        
        case "/my_orders.html":
	        return customer_dir + page_name;
	        
	    /* admin view */
	    /********************************************/
        case "/mng_inventory.html":
	        return admin_dir + page_name;
	        
        case "/publisher_order.html":
	        return admin_dir + page_name;
	         
	    case "/user_accounts.html":
	        return admin_dir + page_name;
	         
	    /* page not found */
	    /********************************************/
	    default:
	    	return "";
	    	
	}
}